type aclT = {
  type: string,
  name: string,
  role: string[]
}[];

export const acl: aclT  = [
  // user
  {type: 'query',     name: 'users',        role: ['user', 'admin'] },
  {type: 'mutation',  name: 'userCreate',   role: ['user', 'admin'] },  
  {type: 'mutation',  name: 'userDelete',   role: ['admin']         },  
  {type: 'mutation',  name: 'userUpdate',   role: ['user','admin']  },  
  {type: 'mutation',  name: 'auth',         role: ['user','admin']  },  
  // client
  {type: 'mutation',  name: 'clientCreate', role: ['user', 'admin'] },  
  {type: 'mutation',  name: 'clientUpdate', role: ['user', 'admin'] },  
  {type: 'mutation',  name: 'clientDelete', role: ['user', 'admin'] },  
  {type: 'query',     name: 'clients',      role: ['user', 'admin'] },
]
  