use anchor_lang::prelude::*;

declare_id!("6mRtZPikcRHiQLwtuzHvgAQE27bmQjKJtPSb9TrqafiH");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello Solana!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
