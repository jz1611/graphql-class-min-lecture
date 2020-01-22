# GraphgQL

## What is it?
* GraphQL is a query language used with APIs to get and edit data.
* Any queries that you make return only the exact information you request, and nothing else.
* It features an in-editor tool to easily view and search for data.
* A type system is utilized and specified by the programmer.

## How to use it?
### Fields, Arguments, and Types
GraphQL looks for fields on given objects. In the following case, name and height are fields on the human object.

A query to the Star Wars API like this:
```
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```
Could return this:
```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

In the case above, ```id: "1000"``` is being used as an argument to specify which human we want. In REST, you can usually only pass a few arguments, like in parameters or body, but with GraphQL, every field and object can have its own arguments. The role of types can be seen above as well. Normally, height is returned in meters, but we have specified it to be feet. GraphQL has many of its own types, but the server can be used to make custom ones.

### Aliases
Aliases are used to rename fields when you may want to query the same field in one query. The example below is still a single query, but we can noew user the ```hero``` field twice by using aliases.
```
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

Returns:
```json
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

### Fragments
Fragments are used to create a set of fields, and reuse them in queries as needed. Think along the lines of how functions are reusable.

```
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

Returns:
```json
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### Variables
Since many queries we use are not static, and are based on some sort of changing input, we need to use variables. In this example, you can see the use of variables, as well as the introduction of an operation type and operation name, as opposed to the shorthand we have seen so far. ```$episode: Episode``` is a variable definition, just like defining arguments in JavaScript. In this case, the variable name is ```episode``` and the type is ```Episode```. ```JEDI``` is the default variable that is used if no variable is passed in from the outside.

Query:
```
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```
Variables:
```
{
  "episode": "JEDI"
}
```
Returns:
```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### Directives
Directives are used to determine if certain information should be fetched. There are two directives ```@include(if: Boolean)``` and ```@skip(if: Boolean)```. These can be attached to fields and use variables to determine what should be displayed. The ```!``` below signifies that a variable is required.
```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```
Variables:
```
{
  "episode": "JEDI",
  "withFriends": false
}
```
Returns:
```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

### What else?
The documentation informs us that there are a few more important things to use when working with GraphSQL:
* Mutations allow us to modify the data on the server side.
* Inline Fragments are confusing and I don't know how to explain them.
* Meta fields are used when you are unsure what type of data you will receive from a query. They can be used to find the name of an object at any point.

The above info is certainly good to know, but not super necessary for a baseline introduction like we are doing here.

## Schemas and Types
This is also a huge amount of inforation that I don't totally get so now it's example time.

## Links
[GraphQL Home Page](https://graphql.org/)
[GraphQL JS Guide](https://graphql.org/graphql-js/)