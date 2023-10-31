class HttpException extends Error {
  constructor(public status: number, public content: { message: string; errors?: any }) {
    super(content.message);
  }
}

export default HttpException;
