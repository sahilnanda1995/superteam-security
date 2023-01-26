use std::{ str::FromStr, convert::TryFrom, mem::size_of };
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, MintTo, Burn, Transfer, Token};

declare_id!("HPyMpt2qxYjifYVkeXEGqbqX4BB4zrLj1Bw69xTTPyFn");

const MASTER: &str = "GBdiDYnNRRdGndYjn4YxyXtYCtpmfXaGALffs5j4KzG8";

const CHALLACC: &[u8]   = b"CHALLACC";
const POOL: &[u8]    = b"POOL";
const TOKEN: &[u8]   = b"TOKEN";
const VOUCHER: &[u8] = b"VOUCHER";

#[program]
pub mod deciswap {
    use super::*;

    pub fn player_setup(ctx: Context<PlayerSetup>) -> Result<()> {
        msg!("deciswap :: player_setup");

        ctx.accounts.chall_account.bump = *ctx.bumps.get("chall_account").unwrap();

        Ok(())
    }

    pub fn add_pool(ctx: Context<AddPool>, pool_index: u8) -> Result<()> {
        msg!("deciswap :: add_pool");

        let deposit_mint = ctx.accounts.deposit_mint.key();
        let pool_seed: &[&[u8]] = &[ctx.accounts.player.key.as_ref(), POOL, deposit_mint.as_ref()];
        let (_, pool_bump) = Pubkey::find_program_address(pool_seed, ctx.program_id);

        ctx.accounts.chall_account.pools[pool_index as usize] = ctx.accounts.pool.key();

        ctx.accounts.pool.bump = pool_bump;
        ctx.accounts.pool.deposit_mint = ctx.accounts.deposit_mint.key();
        ctx.accounts.pool.pool_account = ctx.accounts.pool_account.key();
        ctx.accounts.pool.voucher_mint = ctx.accounts.voucher_mint.key();
        ctx.accounts.pool.decimals = ctx.accounts.deposit_mint.decimals;

        Ok(())
    }

    pub fn deposit(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        msg!("deciswap :: deposit");

        if amount == 0 || amount > ctx.accounts.depositor_account.amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        let chall_account_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.chall_account.bump]]];

        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.depositor_account.to_account_info(),
                to: ctx.accounts.pool_account.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        );

        token::transfer(transfer_ctx, amount)?;

        let mint_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.voucher_mint.to_account_info(),
                to: ctx.accounts.depositor_voucher_account.to_account_info(),
                authority: ctx.accounts.chall_account.to_account_info(),
            },
            chall_account_seed,
        );

        token::mint_to(mint_ctx, amount)?;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        msg!("deciswap :: withdraw");

        if amount == 0 || amount > ctx.accounts.depositor_voucher_account.amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        let chall_account_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.chall_account.bump]]];

        let burn_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.voucher_mint.to_account_info(),
                from: ctx.accounts.depositor_voucher_account.to_account_info(),
                authority: ctx.accounts.depositor.to_account_info(),
            },
        );

        token::burn(burn_ctx, amount)?;

        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.pool_account.to_account_info(),
                to: ctx.accounts.depositor_account.to_account_info(),
                authority: ctx.accounts.chall_account.to_account_info(),
            },
            chall_account_seed,
        );

        token::transfer(transfer_ctx, amount)?;

        Ok(())
    }

    pub fn swap(ctx: Context<Swap>, from_amount: u64) -> Result<()> {
        msg!("deciswap :: swap");

        if from_amount == 0 || from_amount > ctx.accounts.from_swapper_account.amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        let to_amount = u64::try_from(
            u128::from(from_amount)
            .checked_mul(10_u128.pow(ctx.accounts.to_pool.decimals.into())) .unwrap()
            .checked_div(10_u128.pow(ctx.accounts.from_pool.decimals.into())).unwrap()
        ).unwrap();

        let check_amount = u64::try_from(
            u128::from(to_amount)
            .checked_mul(10_u128.pow(ctx.accounts.from_pool.decimals.into())).unwrap()
            .checked_div(10_u128.pow(ctx.accounts.to_pool.decimals.into())).unwrap()
        ).unwrap();

        if from_amount != check_amount {
            return Err(ProgramError::InvalidArgument.into());
        }

        let chall_account_seed: &[&[&[u8]]] = &[&[ctx.accounts.player.key.as_ref(), CHALLACC, &[ctx.accounts.chall_account.bump]]];

        let transfer_in_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.from_swapper_account.to_account_info(),
                to: ctx.accounts.from_pool_account.to_account_info(),
                authority: ctx.accounts.swapper.to_account_info(),
            },
        );

        token::transfer(transfer_in_ctx, from_amount)?;

        let transfer_out_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.to_pool_account.to_account_info(),
                to: ctx.accounts.to_swapper_account.to_account_info(),
                authority: ctx.accounts.chall_account.to_account_info(),
            },
            chall_account_seed,
        );

        token::transfer(transfer_out_ctx, to_amount)?;

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
        space = 8 + size_of::<ChallAccount>(),
    )]
    pub chall_account: Account<'info, ChallAccount>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddPool<'info> {
    /// CHECK: Chall Account's Player
    pub player: AccountInfo<'info>,

    #[account(mut, address = Pubkey::from_str(MASTER).unwrap())]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [player.key().as_ref(), CHALLACC],
        bump = chall_account.bump,
    )]
    pub chall_account: Account<'info, ChallAccount>,

    pub deposit_mint: Account<'info, Mint>,

    #[account(
        init,
        seeds = [player.key().as_ref(), POOL, deposit_mint.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + size_of::<Pool>(),
    )]
    pub pool: Account<'info, Pool>,

    #[account(
        init,
        seeds = [player.key().as_ref(), TOKEN, deposit_mint.key().as_ref()],
        bump,
        token::mint = deposit_mint,
        token::authority = chall_account,
        payer = authority,
    )]
    pub pool_account: Account<'info, TokenAccount>,

    #[account(
        init,
        seeds = [player.key().as_ref(), VOUCHER, deposit_mint.key().as_ref()],
        bump,
        mint::authority = chall_account,
        mint::decimals = deposit_mint.decimals,
        payer = authority,
    )]
    pub voucher_mint: Account<'info, Mint>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    /// CHECK: Chall Account's Player
    pub player: AccountInfo<'info>,

    pub depositor: Signer<'info>,

    #[account(seeds = [player.key().as_ref(), CHALLACC], bump = chall_account.bump)]
    pub chall_account: Account<'info, ChallAccount>,

    pub deposit_mint: Account<'info, Mint>,

    #[account(constraint = chall_account.pools.contains(&pool.key()))]
    pub pool: Account<'info, Pool>,

    #[account(mut, address = pool.pool_account)]
    pub pool_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, seeds = [player.key().as_ref(), VOUCHER, deposit_mint.key().as_ref()], bump)]
    pub voucher_mint: Box<Account<'info, Mint>>,

    #[account(mut, constraint =  depositor_account.mint == pool.deposit_mint)]
    pub depositor_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = depositor_voucher_account.mint == voucher_mint.key())]
    pub depositor_voucher_account: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Swap<'info> {
    /// CHECK: Chall Account's Player
    pub player: AccountInfo<'info>,

    pub swapper: Signer<'info>,

    #[account(seeds = [player.key().as_ref(), CHALLACC], bump = chall_account.bump)]
    pub chall_account: Account<'info, ChallAccount>,
    
    #[account(constraint = chall_account.pools.contains(&from_pool.key()))]
    pub from_pool: Account<'info, Pool>,

    #[account(constraint = chall_account.pools.contains(&to_pool.key()) && from_pool.key() != to_pool.key())]
    pub to_pool: Account<'info, Pool>,

    #[account(mut, address = from_pool.pool_account)]
    pub from_pool_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, address = to_pool.pool_account)]
    pub to_pool_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = from_swapper_account.mint == from_pool.deposit_mint)]
    pub from_swapper_account: Box<Account<'info, TokenAccount>>,

    #[account(mut, constraint = to_swapper_account.mint == to_pool.deposit_mint)]
    pub to_swapper_account: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
}

#[account]
#[derive(Default)]
pub struct ChallAccount {
    bump: u8,
    pools: [Pubkey; 3],
}

#[account]
#[derive(Default)]
pub struct Pool {
    bump: u8,
    deposit_mint: Pubkey, // Token Mint
    pool_account: Pubkey, // Pool account which used to receive deposite_mint
    voucher_mint: Pubkey, // redeem mint account
    decimals: u8,
}
