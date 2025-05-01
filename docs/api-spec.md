# Muvo App API Specification

## Overview

This document outlines the REST API endpoints for the Muvo app, a mobile and web application for MUVO CBD, a Mexican CBD e-commerce and network marketing brand. The API is designed to support MUVERS (network marketing members) and non-MUVERS (casual users) across modules for network marketing, e-commerce, and educational content.

## Base URL

```
https://api.muvoapp.com/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register a new MUVER

```
POST /auth/register
```

Query Parameters:
- `referrer` (optional): MUVER ID of the recruiter

Request Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "address": "string"
}
```

Response (201 Created):
```json
{
  "user_id": "uuid",
  "token": "string"
}
```

Error Responses:
- 400 Bad Request: `{ "error": "Datos inválidos, verifica los campos" }`
- 409 Conflict: `{ "error": "Correo ya registrado" }`

#### Login

```
POST /auth/login
```

Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 OK):
```json
{
  "user_id": "uuid",
  "token": "string"
}
```

Error Responses:
- 401 Unauthorized: `{ "error": "Credenciales incorrectas" }`

### MUVER Profile

#### Get MUVER Profile

```
GET /muver/profile
```

Response (200 OK):
```json
{
  "username": "string",
  "email": "string",
  "phone": "string",
  "address": "string"
}
```

Error Responses:
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`
- 404 Not Found: `{ "error": "Perfil no encontrado" }`

#### Update MUVER Profile

```
PUT /muver/profile
```

Request Body:
```json
{
  "phone": "string",
  "address": "string"
}
```

Response (200 OK):
```json
{
  "username": "string",
  "email": "string",
  "phone": "string",
  "address": "string"
}
```

Error Responses:
- 400 Bad Request: `{ "error": "Datos inválidos, verifica los campos" }`
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`

### QR Code Generation

#### Generate QR Code for Recruitment

```
GET /muver/qr-code
```

Response (200 OK):
```json
{
  "qr_code_url": "string"
}
```

Error Responses:
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`

### Network Hierarchy

#### Get MUVER's Downline Hierarchy

```
GET /muver/network
```

Query Parameters:
- `depth` (optional, default 3): Depth of the downline hierarchy to retrieve

Response (200 OK):
```json
{
  "muver_id": "uuid",
  "downline": [
    {
      "muver_id": "uuid",
      "level": "string",
      "join_date": "timestamp"
    }
  ]
}
```

Error Responses:
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`

### MUVER Metrics

#### Get MUVER's Marketing Metrics

```
GET /muver/metrics
```

Response (200 OK):
```json
{
  "level": "string",
  "points": "number",
  "sales_personal": "number",
  "sales_team": "number"
}
```

Error Responses:
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`

### Events

#### List Events

```
GET /events
```

Query Parameters:
- `type` (optional): Filter by event type (live/online)

Response (200 OK):
```json
[
  {
    "id": "uuid",
    "title": "string",
    "date": "timestamp",
    "type": "string",
    "location": "string",
    "zoom_link": "string"
  }
]
```

#### Create an Event

```
POST /events
```

Request Body:
```json
{
  "title": "string",
  "description": "string",
  "date": "timestamp",
  "type": "string",
  "location": "string",
  "zoom_link": "string"
}
```

Response (201 Created):
```json
{
  "event_id": "uuid"
}
```

Error Responses:
- 400 Bad Request: `{ "error": "Datos inválidos, verifica los campos" }`
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`

#### Get Event Details

```
GET /events/{event_id}
```

Response (200 OK):
```json
{
  "id": "uuid",
  "title": "string",
  "date": "timestamp",
  "type": "string",
  "location": "string",
  "zoom_link": "string"
}
```

Error Responses:
- 404 Not Found: `{ "error": "Evento no encontrado" }`

#### Register for an Event

```
POST /events/{event_id}/register
```

Response (200 OK):
```json
{}
```

Error Responses:
- 400 Bad Request: `{ "error": "Ya estás registrado para este evento" }`
- 401 Unauthorized: `{ "error": "Autenticación requerida" }`
- 404 Not Found: `{ "error": "Evento no encontrado" }`

### Content

#### List Content

```
GET /content
```

Query Parameters:
- `type` (optional): Filter by content type (short/long/pdf)

Response (200 OK):
```json
[
  {
    "id": "uuid",
    "title": "string",
    "type": "string",
    "body": "string",
    "url": "string"
  }
]
```

#### Get Specific Content

```
GET /content/{id}
```

Response (200 OK):
```json
{
  "id": "uuid",
  "title": "string",
  "type": "string",
  "body": "string",
  "url": "string"
}
```

Error Responses:
- 404 Not Found: `{ "error": "Contenido no encontrado" }`

## Error Handling

All endpoints return standard HTTP status codes:

- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Server Error

Error responses follow this format:

```json
{
  "error": "Error message in Spanish"
}
```

## Rate Limiting

API requests are limited to 100 requests per hour per IP address. When the limit is exceeded, the API returns:

```
429 Too Many Requests
{
  "error": "Demasiadas solicitudes, intenta de nuevo más tarde"
}
```
