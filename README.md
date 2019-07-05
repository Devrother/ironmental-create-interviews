## Usage

1. Install is used to install all dependencies for a project.

    ```bash
    $ yarn install
    ```
2. Create `.env` file
    
    Create an .env file referring to the .env.sample file format
    
    ```
    MONGODB_URL=example
    MONGODB_NAME=example
    ```

3. Write interview data
    
    Fill in the `datas` variable in the `index.js` file
    
    ```js
    const datas = [
        {
            'question': 'please write question!!',
            'tags': ['tag1', 'tag2'],
            'answer': 'please write answer!!'
        },
    ];
    ```

4. Run program
   
    ```bash
    $ yarn start
    ```
    or

    ```bash
    $ node index.js
    ```