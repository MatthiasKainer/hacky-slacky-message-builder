const buildSection = ({ project, commit, url, since }) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `:red_circle: *${project}*`,
  },
  fields: [
    {
      type: "mrkdwn",
      text: `${commit.substring(0, 50)}...`,
    },
    {
      type: "mrkdwn",
      text: `_since ${since}_`,
    },
  ],
  accessory: {
    type: "button",
    text: {
      type: "plain_text",
      text: "Open Pipeline",
    },
    style: "danger",
    url,
    action_id: url,
  },
});

const text =
  "This is your friendly half automated reminder for broken builds. There are builds red for X hours, pls assign yourself if you feel responsible";

const blocks = (sections) => {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text,
      },
    },
    {
      type: "divider",
    },
  ];
  sections.foreach((section) => blocks.push(...buildSection(section)));
  blocks.push(
    ...[
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Thanks for caring.",
        },
      },
    ]
  );
  return blocks;
};

const template = (sections) => ({
  text,
  blocks: blocks(sections),
});

module.exports = { template };
