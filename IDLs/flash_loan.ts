export type FlashLoan = {
    "version": "0.1.0",
    "name": "flash_loan",
    "instructions": [
      {
        "name": "setupForPlayer",
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
        "args": []
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
            "name": "challengeAccount",
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
            "name": "challengeAccount",
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
        "name": "borrow",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "challengeAccount",
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
            "name": "depositorAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "instructions",
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
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "repay",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
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
            "name": "depositorAccount",
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
              "name": "borrowing",
              "type": "bool"
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
            }
          ]
        }
      }
    ],
    "metadata": {
      "address": "ARsgcuCrXQSQDrAsuyKNkbgGcS76ni4Rak6uEfibmELH"
    }
  };
  
  export const IDL: FlashLoan = {
    "version": "0.1.0",
    "name": "flash_loan",
    "instructions": [
      {
        "name": "setupForPlayer",
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
        "args": []
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
            "name": "challengeAccount",
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
            "name": "challengeAccount",
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
        "name": "borrow",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "challengeAccount",
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
            "name": "depositorAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "instructions",
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
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "repay",
        "accounts": [
          {
            "name": "player",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "challengeAccount",
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
            "name": "depositorAccount",
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
              "name": "borrowing",
              "type": "bool"
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
            }
          ]
        }
      }
    ],
    "metadata": {
      "address": "ARsgcuCrXQSQDrAsuyKNkbgGcS76ni4Rak6uEfibmELH"
    }
  };
  