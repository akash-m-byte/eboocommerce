import amqp, { Channel, Connection } from 'amqplib';

let connection: Connection | null = null;
let channel: Channel | null = null;

export async function initEventBus(url: string): Promise<Channel> {
  if (channel) return channel;
  connection = await amqp.connect(url);
  channel = await connection.createChannel();
  return channel;
}

export async function publishEvent(exchange: string, routingKey: string, payload: unknown) {
  if (!channel) throw new Error('Event bus not initialized');
  await channel.assertExchange(exchange, 'topic', { durable: true });
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)), { persistent: true });
}

export async function subscribeEvent(queue: string, exchange: string, routingKey: string, handler: (payload: any) => Promise<void>) {
  if (!channel) throw new Error('Event bus not initialized');
  await channel.assertExchange(exchange, 'topic', { durable: true });
  const q = await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(q.queue, exchange, routingKey);

  channel.consume(q.queue, async msg => {
    if (!msg) return;
    const payload = JSON.parse(msg.content.toString());
    await handler(payload);
    channel?.ack(msg);
  });
}
