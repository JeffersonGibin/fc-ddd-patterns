import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class LogWhenCustomersAddressIsChanged
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { eventData } = event;
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address}`);
  }
}