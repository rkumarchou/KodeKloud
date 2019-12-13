# KodeKloud
##### KodeKloud Test Task

### Steps to clone repository
git clone https://github.com/rkumarchou/KodeKloud.git
change directory to 'KodeKloud'
## Steps to run Python backend
change directory to 'backend'

1) Install venv to create virtual environment:
```sh
$ sudo apt-get install python3-venv
```

2) Create virtual environment:
```sh
$ python3 -m venv environment_name
```

3) Activate virtual environment:
```sh
$ . environment_name/bin/activate 
```

4) Install required dependencies
```sh
$ pip install -r requirements.txt
```

5) Run flask app
```sh
$ python run.py
```

after following the above steps you can see the flask server up and running on localhost:5000

## Steps to run angular app
change directory to 'frontend'

npm install

ng serve

after following the above steps you can see the application up and running on localhost:4200
(this angular app is using the localhost:5000 flask server as backend you can change it to use any other backend server using the environments/environment.ts file)