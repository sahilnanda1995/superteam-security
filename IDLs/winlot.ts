export type Winlot = {
  version: "0.1.0";
  name: "winlot";
  instructions: [
    {
      name: "challengeSetup";
      accounts: [
        {
          name: "player";
          isMut: true;
          isSigner: true;
        },
        {
          name: "challengeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "depositMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "poolAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "betWinLoss";
      accounts: [
        {
          name: "player";
          isMut: false;
          isSigner: false;
        },
        {
          name: "depositor";
          isMut: false;
          isSigner: true;
        },
        {
          name: "challengeAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "depositMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "depositorAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recentSlothashes";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "challenge";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "poolBump";
            type: "u8";
          },
          {
            name: "depositMint";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  metadata: {
    address: "AhaFf2P9e1HqsZwgJmGr2svBGBk3JQz8iCpN7VG1QU9Q";
  };
};

export const IDL: Winlot = {
  version: "0.1.0",
  name: "winlot",
  instructions: [
    {
      name: "challengeSetup",
      accounts: [
        {
          name: "player",
          isMut: true,
          isSigner: true,
        },
        {
          name: "challengeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "betWinLoss",
      accounts: [
        {
          name: "player",
          isMut: false,
          isSigner: false,
        },
        {
          name: "depositor",
          isMut: false,
          isSigner: true,
        },
        {
          name: "challengeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "depositMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositorAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recentSlothashes",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "challenge",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "poolBump",
            type: "u8",
          },
          {
            name: "depositMint",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  metadata: {
    address: "AhaFf2P9e1HqsZwgJmGr2svBGBk3JQz8iCpN7VG1QU9Q",
  },
};
