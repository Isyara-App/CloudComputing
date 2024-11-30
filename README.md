# Cloud Computing - API

## User account
### Register 
- URL
  - `/register`

- Method
  - POST

- Request Body
```javascript
{
    "name": string,
    "email": string,
    "password": string
}
```

- Request Body (Example)
```json
{
    "name": "ayumi",
    "email": "ayumi@gmail.com",
    "password": "qwerty123"
}
```

- Response (Example)
```json
{
    "status": "success",
    "message": "User registered successfully",
    "data": {
        "id": 2,
        "name": "ayumi",
        "email": "ayumi@gmail.com",
        "password": "$2b$10$WAJQ9nZtWfpNsRp4ZtioQeiy3z1fq0L1zY9Uq9Dgiv11ewkbFITJW",
        "created_at": "2024-11-30T07:07:32.000Z",
        "updated_at": "2024-11-30T07:07:32.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzI5NTA0NTIsImV4cCI6MTczMjk1NDA1Mn0.xBimJIvh0ADgASqmqGtbHKALhW8L-smEUB2GeUFdnyk"
}
```

### Login 
- URL
  - `/login`

- Method
  - POST

- Request Body
```javascript
{
    "email": string,
    "password": string
}
```

- Request Body (Example)
```json
{
    "email": "ayumi@gmail.com",
    "password": "qwerty123"
}
```

- Response (Example)
```json
{
    "status": "success",
    "message": "Login successfully",
    "data": {
        "name": "ayumi",
        "email": "ayumi@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzI5NTA0NTIsImV4cCI6MTczMjk1NDA1Mn0.xBimJIvh0ADgASqmqGtbHKALhW8L-smEUB2GeUFdnyk"
}
```

### Logout
- URL
  - `/api/logout`

- Method
  - POST

- Headers
  - `Authorization` : `Bearer <token>`

- Response 
```json
{
    "message": "Logged out successfully"
}
```

## Dictionary
### Letters
- URL
  - `/dictionary/letters`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "Letters retrieved successfully",
    "data": [
        {
            "id": 1,
            "image_url": "https://example.com/image_A.jpg",
            "huruf": "A",
            "created_at": "2024-11-14T13:20:33.000Z",
            "updated_at": "2024-11-15T03:39:00.000Z"
        },
        {
            "id": 2,
            "image_url": "https://example.com/image_B.jpg",
            "huruf": "B",
            "created_at": "2024-11-14T14:27:25.000Z",
            "updated_at": "2024-11-15T03:39:12.000Z"
        }
    ]
}
```

### Search Letter
- URL
  - `/dictionary/letters?search=<letter>`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
`/dictionary/letters?search=a`
```json
{
    "status": "success",
    "message": "Letters retrieved successfully",
    "data": [
        {
            "id": 1,
            "image_url": "https://example.com/image_A.jpg",
            "huruf": "A",
            "created_at": "2024-11-14T13:20:33.000Z",
            "updated_at": "2024-11-15T03:39:00.000Z"
        }
    ]
}
```

### Words
- URL
  - `/dictionary/words`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "Words retrieved successfully",
    "data": [
        {
            "id": 3,
            "image_url": "https://example.com/image_Halo.jpg",
            "kata": "Halo",
            "created_at": "2024-11-30T07:44:13.000Z",
            "updated_at": "2024-11-30T07:44:13.000Z"
        },
        {
            "id": 4,
            "image_url": "https://example.com/image_Hai.jpg",
            "kata": "Hai",
            "created_at": "2024-11-30T07:44:32.000Z",
            "updated_at": "2024-11-30T07:44:32.000Z"
        }
    ]
}
```

### Search Word
- URL
  - `/dictionary/words?search=<word>`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
`/dictionary/words?search=halo`
```json
{
    "status": "success",
    "message": "Words retrieved successfully",
    "data": [
        {
            "id": 3,
            "image_url": "https://example.com/image_Halo.jpg",
            "kata": "Halo",
            "created_at": "2024-11-30T07:44:13.000Z",
            "updated_at": "2024-11-30T07:44:13.000Z"
        }
    ]
}
```

## Information
### Community
- URL
  - `/community`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "Communities retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "Community lama",
            "image_url": "https://example.com/image_community_lama.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:54:27.000Z",
            "updated_at": "2024-11-18T13:54:27.000Z"
        },
        {
            "id": 2,
            "title": "Community baru",
            "image_url": "https://example.com/image_community_baru.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:57:28.000Z",
            "updated_at": "2024-11-18T13:57:28.000Z"
        }
    ]
}
```

### Event
- URL
  - `/events`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "Events retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "Event lama",
            "image_url": "https://example.com/image_event_lama.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:54:27.000Z",
            "updated_at": "2024-11-18T13:54:27.000Z"
        },
        {
            "id": 2,
            "title": "Event baru",
            "image_url": "https://example.com/image_event_baru.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:57:28.000Z",
            "updated_at": "2024-11-18T13:57:28.000Z"
        }
    ]
}
```

### News
- URL
  - `/news`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "News retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "News lama",
            "image_url": "https://example.com/image_news_lama.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:54:27.000Z",
            "updated_at": "2024-11-18T13:54:27.000Z"
        },
        {
            "id": 2,
            "title": "News baru",
            "image_url": "https://example.com/image_news_baru.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:57:28.000Z",
            "updated_at": "2024-11-18T13:57:28.000Z"
        }
    ]
}
```

## Quiz
### Get All Level
- URL
  - `/quiz/levels`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "Levels retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Level 1",
            "created_at": "2024-11-27T03:10:57.000Z",
            "updated_at": "2024-11-27T03:10:57.000Z"
        },
        {
            "id": 2,
            "name": "Level 2",
            "created_at": "2024-11-28T06:39:23.000Z",
            "updated_at": "2024-11-28T06:39:23.000Z"
        },
        {
            "id": 3,
            "name": "Level 3",
            "created_at": "2024-11-28T12:13:45.000Z",
            "updated_at": "2024-11-28T12:16:59.000Z"
        }
    ]
}
```

### Get Level by Id
- URL
  - `/quiz/levels/{levelId}`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
```json
{
    "status": "success",
    "message": "Level retrieved successfully",
    "data": {
        "id": 1,
        "name": "Level 1",
        "created_at": "2024-11-27T03:10:57.000Z",
        "updated_at": "2024-11-27T03:10:57.000Z"
    }
}
```
- Note: 
User must complete the previous level to access the next level. For example, to access level 2, you need to complete level 1.

### Get Question by Id from a Level
- URL
  - `/quiz/levels/{levelId}/questions/{questionId}`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Example Response
```json
{
    "status": "success",
    "message": "Question retrieved successfully",
    "data": [
        {
            "id": 1,
            "level_id": 1,
            "question": "What is this sign mean?",
            "correct_option": "A",
            "options": [
                "A",
                "B",
                "C"
            ],
            "created_at": "2024-11-28T06:55:04.000Z",
            "updated_at": "2024-11-28T06:55:04.000Z"
        }
    ]
}
```

### Check Answer
- URL
  - `/quiz/levels/{levelId}/questions/{questionId}/answer`

- Method
  - POST

- Headers
  - `Authorization` : `Bearer <token>`

- Request Body 
```javascript
{
    "selected_option": string
}
```

- Request Body (Example)
```json
{
    "selected_option": "A"
}
```

- Example Response
```json
{
    "status": "success",
    "message": "Correct answer. Continue to the next question.",
    "isCorrect": true
}
```

- Note: 
Once the user completes the last questions for a level, their progress status changes to completed, allowing user to go to the next level.

<br>
 
## Status code
- **200**: OK
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict
- **500**: Internal Server Error
- **502**: Bad Gateway
