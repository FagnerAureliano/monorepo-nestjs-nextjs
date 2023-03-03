export type RandomUserProps = {
    name: {
      title: string
      first: string
      last: string
    }
    location: {
      street: {
        number: number
        name: string
      }
      city: string
      state: string
      country: string
      postcode: number
      coordinates: {
        latitude: string
        longitude: string
      }
      timezone: {
        offset: string
        description: string
      }
    }
    email: string
    login: {
      uuid: string
      username: string
      password: string
      salt: string
      md5: string
      sha1: string
      sha256: string
    }
    dob: {
      date: string
      age: number
    }
    picture: {
      large: string
      medium: string
      thumbnail: string
    }
  }
  