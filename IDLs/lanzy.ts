export type Lanzy = {
    "version": "0.1.0",
    "name": "lanzy",
    "instructions": [
      {
        "name": "playeSetup",
        "accounts": [
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "state",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "New state account for each player"
            ],
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "STATE"
                }
              ]
            }
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositAccount",
            "isMut": true,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "TOKEN"
                }
              ]
            }
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "VOUCHER"
                }
              ]
            }
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "additional program"
            ]
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
            "name": "depositor",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "state",
            "isMut": false,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "STATE"
                }
              ]
            }
          },
          {
            "name": "depositAccount",
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
            "name": "state",
            "isMut": false,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "STATE"
                }
              ]
            }
          },
          {
            "name": "depositAccount",
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
      }
    ],
    "accounts": [
      {
        "name": "state",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "depositAccount",
              "type": "publicKey"
            },
            {
              "name": "depositMint",
              "type": "publicKey"
            }
          ]
        }
      }
    ],
    "metadata": {
        "address": "9pxo7qTLi5vah4DQj7478pNQUtNJ6pXsHdSKoW3kcQJc"
      }
  };
  
  export const IDL: Lanzy = {
    "version": "0.1.0",
    "name": "lanzy",
    "instructions": [
      {
        "name": "playeSetup",
        "accounts": [
          {
            "name": "player",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "state",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "New state account for each player"
            ],
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "STATE"
                }
              ]
            }
          },
          {
            "name": "depositMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "depositAccount",
            "isMut": true,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "TOKEN"
                }
              ]
            }
          },
          {
            "name": "voucherMint",
            "isMut": true,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "VOUCHER"
                }
              ]
            }
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "additional program"
            ]
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
            "name": "depositor",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "state",
            "isMut": false,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "STATE"
                }
              ]
            }
          },
          {
            "name": "depositAccount",
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
            "name": "state",
            "isMut": false,
            "isSigner": false,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "type": "publicKey",
                  "path": "player"
                },
                {
                  "kind": "const",
                  "type": "string",
                  "value": "STATE"
                }
              ]
            }
          },
          {
            "name": "depositAccount",
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
      }
    ],
    "accounts": [
      {
        "name": "state",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "depositAccount",
              "type": "publicKey"
            },
            {
              "name": "depositMint",
              "type": "publicKey"
            }
          ]
        }
      }
    ],
    "metadata": {
        "address": "9pxo7qTLi5vah4DQj7478pNQUtNJ6pXsHdSKoW3kcQJc"
      }
  };
  