import { WebhookEvent } from "@/app/_model/line/lineWebhook";

const handleMessage = (event: WebhookEvent) => {
  console.log(
    `Received message from user ${event.source.userId}: ${event.message.text}`,
  );
};

const getIntent = (context: string) => {
  // TODO: use AI to determine intent from context
};

export default handleMessage;
