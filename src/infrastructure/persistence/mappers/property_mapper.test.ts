import { PropertyEntity } from "../entities/property_entity";
import { Property } from "../../../domain/entities/property";
import { PropertyMapper } from "./property_mapper";

describe("Property Mapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Jardim Verde";
    propertyEntity.description = "Casa de campo";
    propertyEntity.maxGuests = 2;
    propertyEntity.basePricePerNight = 200;

    const property = PropertyMapper.toDomain(propertyEntity);

    expect(property.getId()).toBe(propertyEntity.id);
    expect(property.getName()).toBe(propertyEntity.name);
    expect(property.getDescription()).toBe(propertyEntity.description);
    expect(property.getMaxGuests()).toBe(propertyEntity.maxGuests);
    expect(property.getBasePricePerNight()).toBe(propertyEntity.basePricePerNight);
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    
    const property = new Property("1", "Jardim Verde", "Casa de campo", 2, 200);

    const propertyEntity = PropertyMapper.toPersistence(property);

    expect(propertyEntity.id).toBe(property.getId());
    expect(propertyEntity.name).toBe(property.getName());
    expect(propertyEntity.description).toBe(property.getDescription());
    expect(propertyEntity.maxGuests).toBe(property.getMaxGuests());
    expect(propertyEntity.basePricePerNight).toBe(property.getBasePricePerNight());

  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.description = "Casa de campo";
    propertyEntity.maxGuests = 2;
    propertyEntity.basePricePerNight = 200;

    expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow("O nome é obrigatório");
  });
});