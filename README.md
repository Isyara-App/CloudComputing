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
        "image_url": "https://example.com/loremipsum/lorem_ipsum.png"
        "created_at": "2024-11-30T07:07:32.000Z",
        "updated_at": "2024-11-30T07:07:32.000Z"
    },
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

### Community by id
- URL
  - `/community/{id}`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
`/community/1`
```json
{
    "status": "success",
    "message": "Community retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "Community lama",
            "image_url": "https://example.com/image_community_lama.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:54:27.000Z",
            "updated_at": "2024-11-18T13:54:27.000Z"
        },
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

### Event by id
- URL
  - `/events/{id}`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
`/events/{1}`
```json
{
    "status": "success",
    "message": "Event retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "Event lama",
            "image_url": "https://example.com/image_event_lama.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum justo urna. Mauris maximus odio nulla, id feugiat mauris lacinia a. Etiam in dolor in metus tincidunt commodo eget et mi. ",
            "created_at": "2024-11-18T13:54:27.000Z",
            "updated_at": "2024-11-18T13:54:27.000Z"
        },
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

### News by id
- URL
  - `/news/{id}`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
`/news/1`
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
            "title": "The Basic I",
            "description": "Mari uji Kemampuan berbahasa isyarat anda!",
            "image_url": "https://example.com/image_quiz.png",
            "created_at": "2024-12-05T07:50:29.000Z",
            "updated_at": "2024-12-05T07:50:44.000Z"
        },
        {
            "id": 2,
            "name": "Level 2",
            "title": "The Basic II",
            "description": "Mari uji Kemampuan berbahasa isyarat anda!",
            "image_url": "https://example.com/image_quiz.png",
            "created_at": "2024-12-05T08:39:05.000Z",
            "updated_at": "2024-12-05T08:39:05.000Z"
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
        "name": "Level 1 ",
        "title": "The Basic I",
        "description": "Mari uji Kemampuan berbahasa isyarat anda!",
        "image_url": "https://example.com/image_quiz.png",
        "created_at": "2024-12-05T07:50:29.000Z",
        "updated_at": "2024-12-05T07:50:44.000Z"
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

- Response (Example)
`/quiz/levels/1/questions/1`
```json
{
    "status": "success",
    "message": "Question retrieved successfully",
    "data": {
        "id": 1,
        "question": "Huruf apakah ini?",
        "correct_option": "B",
        "options": [
            "A",
            "B",
            "C"
        ],
        "image_url": "https://example.com/Huruf_B.png",
        "name": "Question 1 of 2"
    }
}
```

`/quiz/levels/2/questions/1`
```json
{
    "status": "success",
    "message": "Question retrieved successfully",
    "data": {
        "id": 1,
        "question": "Huruf apakah ini?",
        "correct_option": "H",
        "options": [
            "Z",
            "B",
            "H"
        ],
        "image_url": "https://example.com/Huruf_H.png",
        "name": "Question 1 of 1"
    }
}
```
- Note: 
The IDs for questions start from 1 again based on the level ID for ease of use.

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
`/quiz/levels/1/questions/1/answer`
```json
{
    "selected_option": "B"
}
```

- Response (Example)
```json
{
    "status": "success",
    "message": "Correct answer. Continue to the next question.",
    "isCorrect": true
}
```

### Check Completion
- URL
  - `/quiz/levels/{levelId}/completion`

- Method
  - GET

- Headers
  - `Authorization` : `Bearer <token>`

- Response (Example)
`/quiz/levels/1/completion`
```json
{
    "status": "success",
    "message": "Congrats! Kamu telah menyelesaikan quiz Level 1 . Silahkan lanjutkan perjalanan mu!",
    "imageUrl": "https://example.com/happy-image.png"
}
```
- Note: 
Once the user completes the level, their progress status changes to completed, allowing user to go to the next level.

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

<br>

## Members
| Name | ID Bangkit | University |
| ---- |----------- | ---------- |
| Ayumi | C293B4KX0752 | Universitas Pelita Harapan |
| Verrel Angkasa | C293B4KY4408 | Universitas Pelita Harapan |
