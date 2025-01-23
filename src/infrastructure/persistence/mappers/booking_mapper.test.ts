import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { Property } from "../../../domain/entities/property";
import { Booking } from "../../../domain/entities/booking";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { PropertyMapper } from "./property_mapper";
import { BookingMapper } from "./booking_mapper";
import { BookingEntity } from "../entities/booking_entity";

describe("Booking Mapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Jardim Verde";
    propertyEntity.description = "Casa de campo";
    propertyEntity.maxGuests = 2;
    propertyEntity.basePricePerNight = 200;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "João Pessoa";

    const bookingEntity = new BookingEntity();
    bookingEntity.id = "1";
    bookingEntity.property = propertyEntity;
    bookingEntity.guest = userEntity;
    bookingEntity.startDate = new Date("2024-12-10");
    bookingEntity.endDate = new Date("2024-12-20");
    bookingEntity.status = "CONFIRMED";
    bookingEntity.totalPrice = 2000;

    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking.getId()).toBe(bookingEntity.id);
    expect(booking.getGuest().getName()).toBe(bookingEntity.guest.name);
    expect(booking.getProperty().getName()).toBe(bookingEntity.property.name);
    expect(booking.getStatus()).toBe(bookingEntity.status);
    expect(booking.getDateRange().getStartDate()).toBe(bookingEntity.startDate);
    expect(booking.getDateRange().getEndDate()).toBe(bookingEntity.endDate);
    expect(booking.getTotalPrice()).toBe(bookingEntity.totalPrice);
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const user = new User("1", "João Pessoa");
    const dateRange = new DateRange(new Date("2024-12-15"), new Date("2024-12-20"));
    const property = new Property("1", "Jardim Verde", "Casa de campo", 2, 200);
    const booking = new Booking("1", property, user, dateRange, 2);

    const bookingEntity = BookingMapper.toPersistence(booking);

    expect(bookingEntity.id).toBe(booking.getId());
    expect(bookingEntity.guest.name).toBe(booking.getGuest().getName());
    expect(bookingEntity.property.name).toBe(booking.getProperty().getName());
    expect(bookingEntity.startDate).toBe(booking.getDateRange().getStartDate());
    expect(bookingEntity.endDate).toBe(booking.getDateRange().getEndDate());
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Jardim Verde";
    propertyEntity.description = "Casa de campo";
    propertyEntity.maxGuests = 2;
    propertyEntity.basePricePerNight = 200;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "João Pessoa";

    const bookingEntity = new BookingEntity();
    bookingEntity.id = "1";
    bookingEntity.property = propertyEntity;
    //bookingEntity.guest = userEntity;
    bookingEntity.startDate = new Date("2024-12-10");
    bookingEntity.endDate = new Date("2024-12-20");
    bookingEntity.status = "CONFIRMED";
    bookingEntity.totalPrice = 2000;

    expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O guest é obrigatório");
  });
});