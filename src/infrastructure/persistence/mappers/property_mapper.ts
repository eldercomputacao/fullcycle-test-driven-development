import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";

export class PropertyMapper {
  static toDomain(entity: PropertyEntity): Property {
    PropertyMapper.validadeFieldsPropertyEntity(entity);
    return new Property(
      entity.id,
      entity.name,
      entity.description,
      entity.maxGuests,
      Number(entity.basePricePerNight)
    );
  }

  static toPersistence(domain: Property): PropertyEntity {
    const entity = new PropertyEntity();
    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.description = domain.getDescription();
    entity.maxGuests = domain.getMaxGuests();
    entity.basePricePerNight = domain.getBasePricePerNight();
    return entity;
  }

  static validadeFieldsPropertyEntity(entity: PropertyEntity): void {
    if (!entity.name) {
      throw new Error("O nome é obrigatório");
    }
    if (!entity.description) {
      throw new Error("A description é obrigatório");
    }
    // TODO Outros campos
  }
}
