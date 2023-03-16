use std::mem::size_of;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program_option::COption;
use anchor_spl::token::{ self, Mint, TokenAccount, MintTo, Burn, Transfer, Token };

declare_id!("9pxo7qTLi5vah4DQj7478pNQUtNJ6pXsHdSKoW3kcQJc");

#[program]
pub mod lanzy {
    use super::*;

    pub fn challenge_setup(ctx: Context<PlayerSetup>) -> Result<()> {
        msg!("lanzy :: challenge_setup");

        ctx.accounts.challenge_account.bump = *ctx.bumps.get("challenge_account").unwrap();
        ctx.accounts.challenge_account.deposit_account = ctx.accounts.deposit_account.key();
        ctx.accounts.challenge_account.deposit_mint = ctx.accounts.deposit_mint.key();

        Ok(())
    }

    pub fn deposit(ctx: Context<Transact>, amount: u64) -> Result<()> {
        msg!("lanzy :: deposit");

        let state_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), "CHALLENGE".as_ref(), &[ctx.accounts.challenge_account.bump]]];

        token::transfer(CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.depositor_account.to_account_info(),
                to: ctx.accounts.deposit_account.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        ), amount)?;

        token::mint_to(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.voucher_mint.to_account_info(),
                to: ctx.accounts.depositor_voucher_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        ), amount)?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Transact>, amount: u64) -> Result<()> {
        msg!("lanzy :: withdraw");

        let state_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), "CHALLENGE".as_ref(), &[ctx.accounts.challenge_account.bump]]];

        token::burn(CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.voucher_mint.to_account_info(),
                from: ctx.accounts.depositor_voucher_account.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        ), amount)?;

        token::transfer(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.deposit_account.to_account_info(),
                to: ctx.accounts.depositor_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        ), amount)?;

        Ok(())
    }

}

#[derive(Accounts)]
pub struct PlayerSetup<'info> {

    #[account(mut)]
    pub player: Signer<'info>,

    /// Creating challenge account for every player
    #[account(
        init,
        seeds = [player.key().as_ref(), "CHALLENGE".as_ref()],
        bump,
        payer = player,
        space = 8 + size_of::<Challenge>(),
    )]
    pub challenge_account: Account<'info, Challenge>,

    pub deposit_mint: Account<'info, Mint>,

    #[account(
        init,
        seeds = [player.key().as_ref(), "TOKEN".as_ref()],
        bump,
        token::mint = deposit_mint,
        token::authority = challenge_account,
        payer = player,
    )]
    pub deposit_account: Account<'info, TokenAccount>,

    #[account(
        init,
        seeds = [player.key().as_ref(), "VOUCHER".as_ref()],
        bump,
        mint::authority = challenge_account,
        mint::decimals = deposit_mint.decimals,
        payer = player,
    )]
    pub voucher_mint: Account<'info, Mint>,

    /// additional program 
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Transact<'info> {
    /// CHECK: player of challenge_account.
    pub player: AccountInfo<'info>,

    pub depositor: Signer<'info>,

    #[account(seeds = [player.key().as_ref(), "CHALLENGE".as_ref()], bump = challenge_account.bump)]
    pub challenge_account: Account<'info, Challenge>,

    #[account(mut, address = challenge_account.deposit_account)]
    pub deposit_account: Account<'info, TokenAccount>,

    #[account(mut, constraint = voucher_mint.mint_authority == COption::Some(challenge_account.key()))]
    pub voucher_mint: Account<'info, Mint>,

    #[account(mut, constraint = depositor_account.mint == challenge_account.deposit_mint)]
    pub depositor_account: Account<'info, TokenAccount>,

    #[account(mut, constraint = depositor_voucher_account.mint == voucher_mint.key())]
    pub depositor_voucher_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Test<> {}

#[account]
#[derive(Default)]
pub struct Challenge {
    bump: u8,
    deposit_account: Pubkey,
    deposit_mint: Pubkey,
}
