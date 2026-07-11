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
                required: ['query']
            }
        }
    }
]

