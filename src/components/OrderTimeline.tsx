import { Check, Package, Truck, MapPin, Home } from 'lucide-react';
import { OrderTimelineEvent } from '../types/extended';

interface OrderTimelineProps {
  events: OrderTimelineEvent[];
  className?: string;
}

export default function OrderTimeline({ events, className = '' }: OrderTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const Icon = getIconForStatus(event.status);

        return (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Timeline Line */}
            {!isLast && (
              <div className={`absolute left-5 top-10 w-0.5 h-full ${
                event.isCompleted ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}

            {/* Icon */}
            <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              event.isCompleted
                ? 'bg-green-500 text-white'
                : event.isCurrent
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                : 'bg-gray-200 text-gray-400'
            }`}>
              {event.isCompleted ? <Check size={20} /> : <Icon size={20} />}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className={`font-semibold ${
                    event.isCompleted || event.isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {event.label}
                  </h4>
                  {event.description && (
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  )}
                </div>
                {event.timestamp && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTimestamp(event.timestamp)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getIconForStatus(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
    case 'confirmed':
      return Package;
    case 'processing':
    case 'packed':
      return Package;
    case 'shipped':
      return Truck;
    case 'out_for_delivery':
      return Truck;
    case 'delivered':
      return Home;
    default:
      return MapPin;
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Helper to generate timeline events from order status
export function generateTimelineEvents(orderStatus: string, orderDates: {
  createdAt: string;
  confirmedAt?: string;
  processingAt?: string;
  packedAt?: string;
  shippedAt?: string;
  outForDeliveryAt?: string;
  deliveredAt?: string;
}): OrderTimelineEvent[] {
  const statusOrder = [
    'pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'
  ];
  
  const currentIndex = statusOrder.indexOf(orderStatus.toLowerCase());
  
  const dateMap: Record<string, string | undefined> = {
    pending: orderDates.createdAt,
    confirmed: orderDates.confirmedAt,
    processing: orderDates.processingAt,
    packed: orderDates.packedAt,
    shipped: orderDates.shippedAt,
    out_for_delivery: orderDates.outForDeliveryAt,
    delivered: orderDates.deliveredAt,
  };

  const labelMap: Record<string, string> = {
    pending: 'Order Placed',
    confirmed: 'Order Confirmed',
    processing: 'Processing',
    packed: 'Packed',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
  };

  return statusOrder.map((status, index) => ({
    status,
    label: labelMap[status],
    timestamp: dateMap[status] || '',
    isCompleted: index < currentIndex,
    isCurrent: index === currentIndex,
    description: index === currentIndex ? 'Current status' : undefined,
  }));
}
