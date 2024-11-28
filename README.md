# CloudComputing

## Quiz
### Get All Level

- URL

  - Tips: `/quiz/levels`

- Method

  - GET

- Headers

  - `Authorization` : `Bearer <token>`

- Example Response

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

  - Tips: `/quiz/levels/{levelId}`

- Method

  - GET

- Headers

  - `Authorization` : `Bearer <token>`

- Example Response

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
You can only access the next level after completing the previous level. Example: to access level 2, you need to completing level 1

### Get Question by Id from a Level

- URL

  - Tips: `/quiz/levels/{levelId}/questions/{questionId}`

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

  - Tips: `/quiz/levels/{levelId}/questions/{questionId}/answer`

- Method

  - POST

- Headers

  - `Authorization` : `Bearer <token>`

- Request Body
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
Completing the last questions for a level, the user_progress status change into completed, and user can go to the next level

Status code
- **200**: OK
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict
- **500**: Internal Server Error
- **502**: Bad Gateway