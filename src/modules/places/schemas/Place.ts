import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('places')
export class Place {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column()
  photo: string
}