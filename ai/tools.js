export const tools = [
    {
        type: 'function',
        function: {
            name: 'getBlogsTitle',
            description: 'Get the list of Blogs available',
        }
    },
    {
        type: 'function',
        function: {
            name: 'searchBlogs',
            description: 'Get the content of specific Blog',
            parameters: {
                type: 'object',
                properties: {
                  title: {
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    description: 'titles of the blog to read'
                  }  
                },
                required: ['title']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'searchSlack',
            description: 'Get list of matching slack messages based on the search query',
            parameters: {
                type: 'object',
                properties: {
                  query: {
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    description: 'queries to search'
                  }  
                },
                required: ['query']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'getReplies',
            description: 'Get thread replies of a specific message',
            parameters: {
                type: 'object',
                properties: {
                  ts: {
                    type: 'string',
                    description: 'ts of the message'
                  },
                  channel:{
                    type: 'string',
                    description: 'channel id'
                  }  
                },
                required: ['ts','channel']
            }
        }
    }   
];

