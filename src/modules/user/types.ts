

// все поля
export type userT = {
  id?: number,
  email: string,
  phone: string,
  name: string,
  password?: string | undefined,
  role: string // нужно присваивать user по умолчанию
  // date monitor
  create_date?: Date,
  changed_date?: Date
}

export type userCreateT = {
  email: string,
  password: string,
}