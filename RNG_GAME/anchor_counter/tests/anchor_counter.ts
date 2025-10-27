import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorCounter } from "../target/types/anchor_counter";
import { expect } from "chai";

describe("anchor_counter", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.anchorCounter as Program<AnchorCounter>;

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const counter = anchor.web3.Keypair.generate();

  it("initialize", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counter])
      .rpc();

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);
  });

  it("increment", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();

    const account = await program.account.counter.fetch(counter.publicKey);

    expect(account.count.toNumber()).to.equal(1);
  });

  it("decrement", async () => {
    const tx = await program.methods
      .decrement()
      .accounts({
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();

    const account = await program.account.counter.fetch(counter.publicKey);

    expect(account.count.toNumber()).to.equal(0);
  });
});
