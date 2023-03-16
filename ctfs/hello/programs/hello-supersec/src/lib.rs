use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("5qMReBnd8bayHtoXo75xLP9KvBB2ybxw8QvJaJ9FDFJW");

#[program]
pub mod hello_supersec {
    use super::*;

    /// NOTE TO READER:
    /// You can safely ignore this part of the contract.
    /// Please scroll below to the section titled "VULNERABILITY LIES BELOW"

    pub fn init(ctx: Context<Initialize>) -> Result<()> {
        msg!("Hey, {:?} :: Welcome!", ctx.accounts.signer.key());

        ctx.accounts.chall_account.pawned = false;
        ctx.accounts.chall_account.bump = *ctx.bumps.get("chall_account").unwrap();
        ctx.accounts.chall_account.reward_vault_bump = *ctx.bumps.get("reward_vault").unwrap();
        let reward_mint_bump = *ctx.bumps.get("reward_mint").unwrap();
        ctx.accounts.chall_account.reward_mint_bump = *ctx.bumps.get("reward_mint").unwrap();

        // Minting 1 billion reward token
        let chall_account = ctx.accounts.chall_account.key();
        let signer: &[&[&[u8]]] = &[&["reward_mint".as_ref(), chall_account.as_ref(), &[reward_mint_bump]]];
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::MintTo {
                mint: ctx.accounts.reward_mint.to_account_info(),
                to: ctx.accounts.reward_vault.to_account_info(),
                authority: ctx.accounts.reward_mint.to_account_info(),
            },
            &signer,
        );
        token::mint_to(cpi_ctx, 1_000_000_000_000_000_000)?;

        Ok(())
    }

    pub fn hint(_ctx: Context<Null>) -> Result<()> {
        msg!("DM @0xDeep on Twitter.");
        Ok(())
    }

    /// 🚨🚨🚨 VULNERABILITY LIES BELOW  🚨🚨🚨

    pub fn challenge(ctx: Context<ChallContext>, sugaku: u64) -> Result<()> {
        // Kaprekar’s constant, 
        if sugaku == 0x181E_u64.checked_div(0x6+0x1+0x7+0x4).unwrap() {
            ctx.accounts.chall_account.pawned = true;

            // transfer_1_billon_token
            let chall_account = ctx.accounts.chall_account.key();
            let nonce = ctx.accounts.chall_account.reward_vault_bump;

            let signer: &[&[&[u8]]] = &[&[chall_account.as_ref(), &[nonce]]];

            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.reward_vault.to_account_info(),
                    to: ctx.accounts.receiver.to_account_info(),
                    authority: ctx.accounts.reward_vault.to_account_info(),
                },
                signer,
            );
            token::transfer(cpi_ctx, 1_000_000_000_000_000_000)?;
            msg!("Congratulations, you successfully exploited the contract 🎉")
        } else {
            msg!("Sorry, your attack failed. Please grind more 🏄‍♂️s")
        }
        Ok(())
    }

    /// 🚨🚨🚨 VULNERABILITY LIES ABOVE 🚨🚨🚨

    /// NOTE TO READER:
    /// You can safely ignore this part of the contract.
    /// Please scroll above to the section titled "VULNERABILITY LIES SOMEWHERE IN THIS SECTION"
    pub fn close(ctx: Context<Close>) -> Result<()> {
        msg!("Closing account :: {}", ctx.accounts.chall_account.key());

        let chall_account = ctx.accounts.chall_account.key();
        let nonce = ctx.accounts.chall_account.reward_vault_bump;

        let signer: &[&[&[u8]]] = &[&[chall_account.as_ref(), &[nonce]]];

        // Burn leftover token
        anchor_spl::token::burn(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::Burn {
                    mint: ctx.accounts.reward_mint.to_account_info(),
                    from: ctx.accounts.reward_vault.to_account_info(),
                    authority: ctx.accounts.reward_vault.to_account_info(),
                },
                signer,
            ),
            ctx.accounts.reward_vault.amount,
        )?;

        anchor_spl::token::close_account(CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            anchor_spl::token::CloseAccount {
                account: ctx.accounts.reward_vault.to_account_info(),
                destination: ctx.accounts.signer.to_account_info(),
                authority: ctx.accounts.reward_vault.to_account_info(),
            },
            signer,
        ))?;

        Ok(())
    }
}

/// NOTE TO READER:
/// You can safely ignore this part of the contract.
/// Please scroll above to the section titled "VULNERABILITY LIES SOMEWHERE IN THIS SECTION"

/// Null Context
#[derive(Accounts)]
pub struct Null {}

/// Initialize new account for players
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = ["hello-supersec".as_bytes(), signer.key().as_ref()],
        bump,
        payer = signer,
        space = 8 + 1+ 1 + 1 + 1
    )]
    pub chall_account: Account<'info, ChallAccount>,

    #[account(
        init,
        payer = signer,
        mint::decimals = 9,
        mint::authority = reward_mint,
        seeds = ["reward_mint".as_bytes(), chall_account.key().as_ref()],
        bump,
    )]
    pub reward_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = signer,
        token::mint = reward_mint,
        token::authority = reward_vault,
        seeds = [chall_account.key().as_ref()],
        bump
    )]
    pub reward_vault: Box<Account<'info, TokenAccount>>,

    pub rent: Sysvar<'info, Rent>,
    pub token_program: Program<'info, Token>,
    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ChallContext<'info> {
    #[account(
        mut,
        seeds = ["hello-supersec".as_bytes(), signer.key().as_ref()],
        bump = chall_account.bump,
    )]
    pub chall_account: Account<'info, ChallAccount>,

    #[account(
        seeds = ["reward_mint".as_bytes(), chall_account.key().as_ref()],
        bump = chall_account.reward_mint_bump,
    )]
    pub reward_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [chall_account.key().as_ref()],
        bump = chall_account.reward_vault_bump
    )]
    pub reward_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        constraint = receiver.mint == reward_mint.key()
    )]
    pub receiver: Account<'info, TokenAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(
        mut,
        seeds = ["hello-supersec".as_bytes(), signer.key().as_ref()],
        bump = chall_account.bump,
        close = signer
    )]
    pub chall_account: Account<'info, ChallAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = ["reward_mint".as_bytes(), chall_account.key().as_ref()],
        bump = chall_account.reward_mint_bump,
    )]
    pub reward_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [chall_account.key().as_ref()],
        bump = chall_account.reward_vault_bump
    )]
    pub reward_vault: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
}

#[account]
#[derive(Default)]
pub struct ChallAccount {
    pawned: bool,
    bump: u8,
    reward_vault_bump: u8,
    reward_mint_bump: u8,
}
