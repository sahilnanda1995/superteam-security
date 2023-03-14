export type Deciswap = {
    "version": "0.1.0",
    "name": "deciswap",
    "instructions": [
      {
        "name": "challengeSetup",
        "accounts": [
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
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
        "name": "addPool",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "poolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "poolIndex",
            "type": "u8"
          }
        ]
      },
      {
        "name": "deposit",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositor",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "poolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorVoucherAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdraw",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositor",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "poolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorVoucherAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "swap",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "swapper",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "fromPool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "toPool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "fromPoolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "toPoolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "fromSwapperAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "toSwapperAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "fromAmount",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "challenge",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "pools",
              "type": {
                "array": [
                  "publicKey",
                  3
                ]
              }
            }
          ]
        }
      },
      {
        "name": "pool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "depositMint",
              "type": "publicKey"
            },
            {
              "name": "poolAccount",
              "type": "publicKey"
            },
            {
              "name": "voucherMint",
              "type": "publicKey"
            },
            {
              "name": "decimals",
              "type": "u8"
            }
          ]
        }
      }
    ],
    "metadata": {
        "address": "9VrbvHYqJHzkn6kftnYsxHrBgkr624oeeLzBpjpreRE8"
    }
  };
  
  export const IDL: Deciswap = {
    "version": "0.1.0",
    "name": "deciswap",
    "instructions": [
      {
        "name": "challengeSetup",
        "accounts": [
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
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
        "name": "addPool",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "poolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "poolIndex",
            "type": "u8"
          }
        ]
      },
      {
        "name": "deposit",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositor",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "poolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorVoucherAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdraw",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositor",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "pool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "poolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "depositorVoucherAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "swap",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "swapper",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "fromPool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "toPool",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "fromPoolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "toPoolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "fromSwapperAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "toSwapperAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "fromAmount",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "challenge",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "pools",
              "type": {
                "array": [
                  "publicKey",
                  3
                ]
              }
            }
          ]
        }
      },
      {
        "name": "pool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "depositMint",
              "type": "publicKey"
            },
            {
              "name": "poolAccount",
              "type": "publicKey"
            },
            {
              "name": "voucherMint",
              "type": "publicKey"
            },
            {
              "name": "decimals",
              "type": "u8"
            }
          ]
        }
      }
    ],
    "metadata": {
        "address": "9VrbvHYqJHzkn6kftnYsxHrBgkr624oeeLzBpjpreRE8"
      }
  };
  