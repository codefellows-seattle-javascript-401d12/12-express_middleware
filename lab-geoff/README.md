# MondayNightPinball Resource API

This API currently handles the CRD of CRUD for player objects. Each player has a name and email (for now), and IDs will be auto-assigned. This API uses express for the service and routing layers.

# API

## GET /api/player?id=player_id
Gets a player from the system. Returns application/json of the player object, or 404 if not found.

## POST /api/player
Add a player to the system.
```js
{
  name: 'First Last',
  email: 'someone@example.com'
}
```
Both `name` and `email` are required in the post body. API expects content type of application/json.

## DELETE /api/player?id=player_id
Removes a player from the system, if found.
