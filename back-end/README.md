# Supabase Local Database and Edge Function App

This project contains a local database setup using Supabase and an edge function app implemented using Deno. The edge function allows clearing all todos associated with a specific user from the local Supabase database.

## File Structure

```plaintext
.
├── .gitignore
├── deno.json
├── deno.lock
├── .idea
│   ├── back-end.iml
│   ├── deno.xml
│   ├── misc.xml
│   ├── modules.xml
│   └── workspace.xml
└── supabase
    ├── .env
    ├── config.toml
    ├── seed.sql
    └── functions
        └── clear-all
            └── index.ts
```

## Project Setup

### Dependencies

- **Deno**: Make sure Deno is installed on your system. You can download it from [deno.land](https://deno.land/).
- **Supabase**: This project uses Supabase for local database management. Refer to the [Supabase documentation](https://supabase.io/docs) for installation and setup instructions.

### Running the Project Locally

```bash
# Make sure your supabase server up and running.

# Start the development server
deno task dev
```

## Usage

Once the project is set up and running locally, you can interact with the Supabase database through the provided edge function. The function is accessible at `http://localhost:8000/clear-all` and requires a valid authorization token in the request headers.

### Endpoint

- **GET** `/clear-all`: Clears all todos associated with the authenticated user.

#### Request Headers

- `Authorization`: Bearer token for user authentication.

#### Response

The response will indicate the success or failure of the operation.

```json
{
  "message": "Cleared All Todos",
  "status": "success"
}
```

## API Documentation

### Clear All Todos

Endpoint: `GET /clear-all`

Clears all todos associated with the authenticated user.

#### Request

```plaintext
GET /clear-all
Host: localhost:8000
Authorization: Bearer <your-token>
```

#### Response

```json
{
  "message": "Cleared All Todos",
  "status": "success"
}
```

## Contributing

Contributions to this project are welcome. Feel free to open issues or pull requests for any improvements or fixes you'd like to suggest.

## License

This project is licensed under the [MIT License](LICENSE).