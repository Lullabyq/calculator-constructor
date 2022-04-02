# React + Node.js + Express app

## Server Api:

1) Request body:
```
enum Operations {
  Addition,
  Substraction,
  Multiplication,
  Division
}

{
  number1: number,
  number2: number,
  action: Operations
}
```

2) Response body fulfilled:
```
{
  result: number
}
```

3) Response body rejected:
```
{
  message: string
}
```
