export async function POST(request: Request) {
    const body = await request.text();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${process.env.GRAPHQL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Pass through any required headers like auth tokens
            'X-Auth-Token': process.env.GRAPHQL_TOKEN ?? '',
        },
        body,
    });

    const data = await response.text();

    return new Response(data, {
        status: response.status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
