type aclT = {
  type: string,
  name: string,
  role: string[]
}[];

export const acl: aclT  = [
  {type: 'query',     name: 'users',        role: ['user', 'admin'] },
  {type: 'mutation',  name: 'userCreate',   role: ['user', 'admin'] },  
  {type: 'mutation',  name: 'userDelete',   role: ['admin']         },  
  {type: 'mutation',  name: 'userUpdate',   role: ['user','admin']  },  
  {type: 'mutation',  name: 'auth',         role: ['user','admin']  },  
]
  