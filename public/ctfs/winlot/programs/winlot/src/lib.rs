use anchor_lang::{prelude::*, solana_program::sysvar};
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use std::mem::size_of;

declare_id!("AhaFf2P9e1HqsZwgJmGr2svBGBk3JQz8iCpN7VG1QU9Q");

const CHALLACC: &[u8] = b"CHALLENGE";
const TOKEN: &[u8] = b"TOKEN";

#[program]
pub mod winlot {
    use super::*;

    pub fn challenge_setup(ctx: Context<PlayerSetup>) -> Result<()> {
        msg!("winlot :: challenge_setup");

        ctx.accounts.challenge_account.bump = *ctx.bumps.get("challenge_account").unwrap();
        ctx.accounts.challenge_account.pool_bump = *ctx.bumps.get("pool_account").unwrap();
        ctx.accounts.challenge_account.deposit_mint = ctx.accounts.pool_account.key();

        Ok(())
    }

    pub fn bet_win_loss(ctx: Context<BetWinLoss>, amount: u64) -> Result<()> {
        if amount == 0 || amount > ctx.accounts.depositor_account.amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        // I don't care about randomness
        let clock = Clock::get()?;
        if clock.unix_timestamp.checked_rem(2).unwrap() == 0 {
            let auth_seed: &[&[&[u8]]] = &[&[
                ctx.accounts.player.key.as_ref(),
                TOKEN,
                &[ctx.accounts.challenge_account.pool_bump],
            ]];

            let transfer_ctx = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.pool_account.to_account_info(),
                    to: ctx.accounts.depositor_account.to_account_info(),
                    authority: ctx.accounts.challenge_account.to_account_info(),
                },
                auth_seed,
            );
            token::transfer(transfer_ctx, amount)?;
        } else {
            let transfer_ctx = CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.depositor_account.to_account_info(),
                    to: ctx.accounts.pool_account.to_account_info(),
                    authority: ctx.accounts.depositor.to_account_info(),
                },
            );

            token::transfer(transfer_ctx, amount)?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct PlayerSetup<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        init,
        seeds = [player.key().as_ref(), CHALLACC],
        bump,
        payer = player,
        space = 8 + size_of::<Challenge>()
    )]
    pub challenge_account: Box<Account<'info, Challenge>>,

    pub deposit_mint: Account<'info, Mint>,

    #[account(
        init,
        seeds = [player.key().as_ref(), TOKEN],
        bump,
        token::mint = deposit_mint,
        token::authority = challenge_account,
        payer = player,
    )]
    pub pool_account: Account<'info, TokenAccount>,

    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BetWinLoss<'info> {
    /// CHECK: player of challenge account
    pub player: AccountInfo<'info>,

    pub depositor: Signer<'info>,

    #[account(seeds = [player.key().as_ref(), CHALLACC], bump = challenge_account.bump)]
    pub challenge_account: Account<'info, Challenge>,

    #[account(mut, address = deposit_mint.key())]
    pub deposit_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [player.key().as_ref(), TOKEN],
        bump = challenge_account.pool_bump,
        token::mint = deposit_mint,
        token::authority = challenge_account
    )]
    pub pool_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        token::mint = deposit_mint,
        token::authority = depositor
    )]
    pub depositor_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,

    /// CHECK: account constraints checked in account trait
    #[account(address = sysvar::slot_hashes::id())]
    recent_slothashes: AccountInfo<'info>,
}

#[account]
#[derive(Default)]
pub struct Challenge {
    bump: u8,
    pool_bump: u8,
    deposit_mint: Pubkey,
}
