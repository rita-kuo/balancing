interface LineWebhook {
  destination: string;
  events: WebhookEvent[];
}

export interface WebhookEvent {
  type: "message";
  webhookEventId: string;
  timestamp: number;
  replyToken: string;
  mode: "active";
  message: {
    type: "text";
    id: string;
    quoteToken: string;
    text: string;
  };
  deliveryContext: {
    isRedelivery: boolean;
  };
  source: {
    type: "user";
    userId: string;
  };
}

export default LineWebhook;
