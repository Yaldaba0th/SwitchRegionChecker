import xmltodict
import json

def remparen(st):
    return st[:st.rfind("(")-1]

with open('./switchtdb.xml', 'r', encoding='utf-8') as file:
    my_xml = file.read()

temp_dict = xmltodict.parse(my_xml)
my_dict = temp_dict['datafile']['game']
gamelist1=[{"name":remparen(d["@name"]),"id":d["id"],"regions":d["region"]} for d in my_dict]
gl2=[{"code":g["id"][:-1],"name":g["name"],"regions":g["regions"],"version":g["id"][-1]} for g in gamelist1]

with open('gdata.json', 'w') as f:
    json.dump(gl2, f)