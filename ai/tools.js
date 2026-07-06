export const tools = [
    {
        type: 'function',
        function: {
            name: 'searchBlogs',
            description: 'Search Blogs related to hackclub',
            parameters: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string'
                  }  
                },
                required: ['query']
            }
        }
    }
]

export async function searchBlogs( query ) {
    
}