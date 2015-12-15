# Explore the Kepler Exoplanets (In Development)
Lighthouse Labs final project: Data visualization of the Kepler system using threeJS and Django.


## Getting Ready

### Python Installation
You should install Python v3.4.3. Run the following to check if it is installed (and to check which version):

```bash
python --version
```

If Python is not installed, [click here](https://www.python.org/downloads/release/python-343/) for instructions on how to install.

Install pip packages installer:

```bash
python get-pip.py
```

### Virtualenv Installation (NOTE: only if you are not using Vagrant)

Virtualenv enables multiple side-by-side installations of Python, one for each project.

```bash
pip install virtualenv
```

Once you have virtualenv installed, just fire up a shell and create your own environment:

```bash
mkdir myproject
cd myproject
virtualenv env
```

Now, whenever you want to work on a project, you only have to activate the corresponding environment:

```bash
source venv/bin/activate
```

To exit the virtual environment:

```bash
deactivate
```

##While in virtualenv
### Installing Packages

After you have installed Python and Pip (or Virtual Env), run the following code to "bundle install" all the packages:

```bash
pip install -r requirements.txt
```

If you want to add any packages, do the following:

```bash
pip install pkg_name
pip freeze
```

  Copy exactly the line of the package you just installed from the Terminal into this requirements.txt

## Running the Project
###Set up the Database
```bash
python manage.py migrate
python manage.py makemigrations main
python manage.py migrate main

```

To run the server, type the following into your terminal:

```bash
python manage.py runserver
```

Go to localhost:8000 in your browser.

## Enjoy our app! From Lars, Anita, Fabien, and Jennifer
