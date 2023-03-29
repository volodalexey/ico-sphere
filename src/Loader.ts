// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Loader {
  static async getText (url: string): Promise<string> {
    const response = await fetch(url)
    if (!response.ok) {
      throw Error('Unable to load file as text')
    }
    return await response.text()
  }
}
