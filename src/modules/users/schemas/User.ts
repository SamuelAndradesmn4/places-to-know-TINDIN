import { Exclude } from 'class-transformer'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Exclude()
  @Column()
  email: string

  @Exclude()
  @Column()
  password: string
}