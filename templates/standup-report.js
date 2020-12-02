const updateSection = ({ title, stories }) => [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: title,
    },
  },
  ...stories.map(({ id, url, text }) => ({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*${id}* - ${text}`,
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Open",
        emoji: true,
      },
      style: "primary",
      url,
      action_id: "button-action",
    },
  })),
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: " ",
    },
  },
  {
    type: "divider",
  },
];

const blocks = ({ text, image_url, image_text, board_url, sections }) => {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text,
        emoji: true,
      },
    },
    image_url
      ? {
          type: "image",
          title: {
            type: "plain_text",
            text: image_text,
            emoji: true,
          },
          image_url,
          alt_text: image_text,
        }
      : undefined,
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: " ",
      },
    },
    {
      type: "divider",
    },
  ];

  sections.forEach((section) => blocks.push(...updateSection(section)));

  blocks.push(
    ...[
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "See you tomorrow",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Open our Board",
            emoji: true,
          },
          style: "primary",
          url: board_url,
          action_id: "button-action",
        },
      },
    ]
  );
  return blocks;
};

const template = (data) => ({
  text: data.text,
  blocks: blocks(data),
});

module.exports = { template };
