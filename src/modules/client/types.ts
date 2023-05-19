

export type clientT = {
  id?: number,
  email?: string,
  phone: string,
  name?: string,
  city?: string,
  district?: string,
  wish?: string,
  create_date?: Date,
  changed_date?: Date
}

export type clientCreateT = {
  email?: string,
  phone: string,
  name?: string,
  city?: string,
  district?: string,
  wish?: string,
}