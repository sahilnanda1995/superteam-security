use std::{ str::FromStr, mem::size_of };
use core::convert::TryInto;
use anchor_lang::prelude::*;
use anchor_spl::token::{ self, Mint, TokenAccount, MintTo, Burn, Transfer, Token };
use anchor_lang::solana_program as solana;

declare_id!("ARsgcuCrXQSQDrAsuyKNkbgGcS76ni4Rak6uEfibmELH");

const MASTER: &str = "8vYUVdb814eopfoS4eiRKxCtdvZkJXhNtqaeZyb2nuw5";

const CHALLACC: &[u8]      = b"CHALLENGE";
const POOL: &[u8]       = b"POOL";
const TOKEN: &[u8]      = b"TOKEN";
const VOUCHER: &[u8]    = b"VOUCHER";

const REPAY_OPCODE: u64 = 0xea674352d0eadba6;

#[program]
pub mod flash_loan {
    use super::*;

    pub fn challenge_setup(ctx: Context<PlayerSetup>) -> Result<()> {
        msg!("flash_loan :: challenge_setup");

        ctx.accounts.challenge_account.bump = *ctx.bumps.get("challenge_account").unwrap();
        
        Ok(())
    }

    pub fn add_pool(ctx: Context<AddPool>) -> Result<()> {
        msg!("flash_loan :: add_pool");

        ctx.accounts.pool.bump = *ctx.bumps.get("pool").unwrap();
        ctx.accounts.pool.borrowing = false;
        ctx.accounts.pool.deposit_mint = ctx.accounts.deposit_mint.key();
        ctx.accounts.pool.pool_account = ctx.accounts.pool_account.key();
        ctx.accounts.pool.voucher_mint = ctx.accounts.voucher_mint.key();

        Ok(())
    }

    pub fn deposit(ctx: Context<DepositWithdraw>, amount: u64) -> Result<()> {
        msg!("flash_loan deposit");

        if amount == 0 || amount > ctx.accounts.depositor_account.amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        let state_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.challenge_account.bump]]];

        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.depositor_account.to_account_info(),
                to: ctx.accounts.pool_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        );

        token::transfer(transfer_ctx, amount)?;

        let mint_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.voucher_mint.to_account_info(),
                to: ctx.accounts.depositor_voucher_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        );

        token::mint_to(mint_ctx, amount)?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<DepositWithdraw>, amount: u64) -> Result<()> {
        msg!("flash_loan withdraw");

        if amount == 0 || amount > ctx.accounts.depositor_voucher_account.amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        let state_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.challenge_account.bump]]];

        let burn_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.voucher_mint.to_account_info(),
                from: ctx.accounts.depositor_voucher_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        );

        token::burn(burn_ctx, amount)?;

        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.pool_account.to_account_info(),
                to: ctx.accounts.depositor_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        );

        token::transfer(transfer_ctx, amount)?;

        Ok(())
    }

    pub fn borrow(ctx: Context<Borrow>, amount: u64) -> Result<()> {
        msg!("flash_loan borrow");

        if ctx.accounts.pool.borrowing {
            return Err(ProgramError::InvalidAccountData.into());
        }

        let ixns = ctx.accounts.instructions.to_account_info();

        let current_index = solana::sysvar::instructions::load_current_index_checked(&ixns)? as usize;
        let mut i = current_index + 1;
        loop {
            if let Ok(ixn) = solana::sysvar::instructions::load_instruction_at_checked(i, &ixns) {
                if ixn.program_id == *ctx.program_id
                && u64::from_be_bytes(ixn.data[..8].try_into().unwrap()) == REPAY_OPCODE
                && ixn.accounts[3].pubkey == ctx.accounts.pool.key() {
                    if u64::from_le_bytes(ixn.data[8..16].try_into().unwrap()) == amount {
                        break;
                    } else {
                        return Err(ProgramError::InvalidArgument.into());
                    }
                } else {
                    i += 1;
                }
            }
            else {
                return Err(ProgramError::InvalidInstructionData.into());
            }
        }

        let state_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.challenge_account.bump]]];

        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.pool_account.to_account_info(),
                to: ctx.accounts.depositor_account.to_account_info(),
                authority: ctx.accounts.challenge_account.to_account_info(),
            },
            state_seed,
        );

        token::transfer(transfer_ctx, amount)?;
        ctx.accounts.pool.borrowing = true;

        Ok(())
    }

    pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
        msg!("flash_loan repay");

        let state_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.challenge_account.bump]]];

        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.depositor_account.to_account_info(),
                to: ctx.accounts.pool_account.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
            state_seed,
        );

        token::transfer(transfer_ctx, amount)?;
        ctx.accounts.pool.borrowing = false;

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
        space = 8 + size_of::<Challenge>(),
    )]
    pub challenge_account: Box<Account<'info, Challenge>>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddPool<'info> {
    /// CHECK: player of challenge account
    pub player: AccountInfo<'info>,

    #[account(mut, address = Pubkey::from_str(MASTER).unwrap())]
    pub authority: Signer<'info>,

    #[account(
        seeds = [player.key().as_ref(), CHALLACC],
        bump = challenge_account.bump,
    )]
    pub challenge_account: Account<'info, Challenge>,

    pub deposit_mint: Account<'info, Mint>,

    #[account(
        init,
        seeds = [player.key().as_ref(), POOL],
        bump,
        payer = authority,
        space = 8 + size_of::<Pool>(),
    )]
    pub pool: Account<'info, Pool>,

    #[account(
        init,
        seeds = [player.key().as_ref(), TOKEN],
        bump,
        token::mint = deposit_mint,
        token::authority = challenge_account,
        payer = authority,
    )]
    pub pool_account: Account<'info, TokenAccount>,
    
    #[account(
        init,
        seeds = [player.key().as_ref(), VOUCHER],
        bump,
        mint::authority = challenge_account,
        mint::decimals = deposit_mint.decimals,
        payer = authority,
    )]
    pub voucher_mint: Account<'info, Mint>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct DepositWithdraw<'info> {
    /// CHECK: player of challenge account
    pub player: AccountInfo<'info>,

    #[account(seeds = [player.key().as_ref(), CHALLACC], bump = challenge_account.bump)]
    pub challenge_account: Account<'info, Challenge>,

    #[account(seeds = [player.key().as_ref(), POOL], bump = pool.bump)]
    pub pool: Account<'info, Pool>,

    #[account(mut, address = pool.pool_account)]
    pub pool_account: Account<'info, TokenAccount>,

    #[account(mut, address = pool.voucher_mint)]
    pub voucher_mint: Account<'info, Mint>,

    #[account(mut, constraint =  depositor_account.mint == pool.deposit_mint)]
    pub depositor_account: Account<'info, TokenAccount>,

    #[account(mut, constraint = depositor_voucher_account.mint == pool.voucher_mint)]
    pub depositor_voucher_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Borrow<'info> {
    /// CHECK: player of challenge account
    pub player: AccountInfo<'info>,

    #[account(seeds = [player.key().as_ref(), CHALLACC], bump = challenge_account.bump)]
    pub challenge_account: Account<'info, Challenge>,

    #[account(mut, seeds = [player.key().as_ref(), POOL], bump = pool.bump)]
    pub pool: Account<'info, Pool>,

    #[account(mut, address = pool.pool_account)]
    pub pool_account: Account<'info, TokenAccount>,

    #[account(mut, constraint =  depositor_account.mint == pool.deposit_mint)]
    pub depositor_account: Account<'info, TokenAccount>,
    
    #[account(address = solana::sysvar::instructions::ID)]
    /// CHECK: fuck you its not unsafe
    pub instructions: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Repay<'info> {
    /// CHECK: player of challenge account
    pub player: AccountInfo<'info>,

    pub user: Signer<'info>,

    #[account(seeds = [player.key().as_ref(), CHALLACC], bump = challenge_account.bump)]
    pub challenge_account: Account<'info, Challenge>,
    
    #[account(mut, seeds = [player.key().as_ref(), POOL], bump = pool.bump)]
    pub pool: Account<'info, Pool>,

    #[account(mut, address = pool.pool_account)]
    pub pool_account: Account<'info, TokenAccount>,

    #[account(mut, constraint =  depositor_account.mint == pool.deposit_mint)]
    pub depositor_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[account]
#[derive(Default)]
pub struct Challenge {
    bump: u8,
}

#[account]
#[derive(Default)]
pub struct Pool {
    bump: u8,
    borrowing: bool,
    deposit_mint: Pubkey,
    pool_account: Pubkey,
    voucher_mint: Pubkey,
}
