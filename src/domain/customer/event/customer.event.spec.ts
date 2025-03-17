import EventDispatcher from "../../@shared/event/event-dispatcher"
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface"
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import LogWhenCustomerIsCreatedHandler from "./handler/log-when-customer-is-created.handler";
import LogWhenCustomersAddressIsChanged from "./handler/log-when-customers-address-is-changed.handler";
import Log2WhenCustomerIsCreatedHandler from "./handler/log2-when-customer-is-created.handler";

describe('Customer events - test', () => {
    let eventDispatcher: EventDispatcherInterface

    beforeEach(() => {
      eventDispatcher = new EventDispatcher()
    });

    afterEach(() => {
        eventDispatcher = null;
    })

    describe('CustomerCreated', () => {
        it('should fire event when customer is created', () => {
          const logSpy = jest.spyOn(console, "log");

          const logHandler1 = new LogWhenCustomerIsCreatedHandler();
          const logHandler2 = new Log2WhenCustomerIsCreatedHandler();
          
          eventDispatcher.register("CustomerCreatedEvent", logHandler1);
          eventDispatcher.register("CustomerCreatedEvent", logHandler2);

          const customerCreatedEvent = new CustomerCreatedEvent({});
    
          eventDispatcher.notify(customerCreatedEvent);
    
          expect(logSpy).toBeCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
          expect(logSpy).toBeCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
        });
    });

    describe('AddressChanged', () => {
        it('should fire event when customers address is changed', () => {
            const logSpy = jest.spyOn(console, "log");

            const eventData = {
                id: 979797,
                name: "Jeff Bezos",
                address: new Address("St. Two", 99, "999-22", "City")
            };

            eventDispatcher.register("CustomerAddressChangedEvent", new LogWhenCustomersAddressIsChanged());
            const addressChangedEvent = new CustomerAddressChangedEvent(eventData);
        
            eventDispatcher.notify(addressChangedEvent);
        
            expect(logSpy).toBeCalledWith("Endereço do cliente: 979797, Jeff Bezos alterado para: St. Two, 99, 999-22 City");
        });
    });
});