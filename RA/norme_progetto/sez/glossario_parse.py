# coding=utf-8
#16/03/2018
#breve script che si occupa di recuperare tutti i termini di glossario da un 
#documento LaTeX del gruppo SonsOfSwe e, li scrive in un file.

import string
import re
import glob
import os

def parse(folder_path, name_file_terms):
	#https://stackoverflow.com/questions/18262293/how-to-open-every-file-in-a-folder

	out_file = open(name_file_terms + ".txt","w")
	for filename in glob.glob(os.path.join(folder_path, '*.tex')):
		with open(filename) as f:
			content = f.readlines()
			for line in content:
				res = re.findall(r'{[a-z0-9A-Z\s\'àòèéù\\\+\-\*/]*[}\s?\^&%]*\\ped{G}', line)
				#print(res)
				for x in res:
					mod = re.sub(r'^{', '', x)	#cancella { all'inizio
					mod = re.sub(r'}*\\ped{G}$', '', mod) #}ped{G}			
					out_file.write( mod + "\n" )
			f.close()
	out_file.close()

folder_path = input("inserire il nome della cartella che si vuole parsare: ")
name_file_terms = input("inserire il nome che si vuole dare al file generato: ")
parse(folder_path, name_file_terms)
print("File generato! Buon lavoro col glossario :D\n")