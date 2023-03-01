export type HelloSupersec = {
  "version": "0.1.0",
  "name": "hello_supersec",
  "instructions": [
    {
      "name": "init",
      "docs": [
        "NOTE TO READER:",
        "You can safely ignore this part of the contract.",
        "Please scroll below to the section titled \"VULNERABILITY LIES BELOW\""
      ],
      "accounts": [
        {
          "name": "challAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "hello-supersec"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "reward_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "hint",
      "accounts": [],
      "args": []
    },
    {
      "name": "challenge",
      "docs": [
        "🚨🚨🚨 VULNERABILITY LIES BELOW  🚨🚨🚨"
      ],
      "accounts": [
        {
          "name": "challAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "hello-supersec"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "reward_mint"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sugaku",
          "type": "u64"
        }
      ]
    },
    {
      "name": "close",
      "docs": [
        "🚨🚨🚨 VULNERABILITY LIES ABOVE 🚨🚨🚨",
        "NOTE TO READER:",
        "You can safely ignore this part of the contract.",
        "Please scroll above to the section titled \"VULNERABILITY LIES SOMEWHERE IN THIS SECTION\""
      ],
      "accounts": [
        {
          "name": "challAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "hello-supersec"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rewardMint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "reward_mint"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "challAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pawned",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "rewardVaultBump",
            "type": "u8"
          },
          {
            "name": "rewardMintBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "metadata": {
    "address": "5qMReBnd8bayHtoXo75xLP9KvBB2ybxw8QvJaJ9FDFJW"
  }
};

export const IDL: HelloSupersec = {
  "version": "0.1.0",
  "name": "hello_supersec",
  "instructions": [
    {
      "name": "init",
      "docs": [
        "NOTE TO READER:",
        "You can safely ignore this part of the contract.",
        "Please scroll below to the section titled \"VULNERABILITY LIES BELOW\""
      ],
      "accounts": [
        {
          "name": "challAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "hello-supersec"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "reward_mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "hint",
      "accounts": [],
      "args": []
    },
    {
      "name": "challenge",
      "docs": [
        "🚨🚨🚨 VULNERABILITY LIES BELOW  🚨🚨🚨"
      ],
      "accounts": [
        {
          "name": "challAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "hello-supersec"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "rewardMint",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "reward_mint"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sugaku",
          "type": "u64"
        }
      ]
    },
    {
      "name": "close",
      "docs": [
        "🚨🚨🚨 VULNERABILITY LIES ABOVE 🚨🚨🚨",
        "NOTE TO READER:",
        "You can safely ignore this part of the contract.",
        "Please scroll above to the section titled \"VULNERABILITY LIES SOMEWHERE IN THIS SECTION\""
      ],
      "accounts": [
        {
          "name": "challAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "hello-supersec"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rewardMint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "reward_mint"
              }
            ]
          }
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "type": "publicKey",
                "account": "ChallAccount",
                "path": "chall_account"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "challAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pawned",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "rewardVaultBump",
            "type": "u8"
          },
          {
            "name": "rewardMintBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "metadata": {
    "address": "5qMReBnd8bayHtoXo75xLP9KvBB2ybxw8QvJaJ9FDFJW"
  }
};
