import arcpy, os, sys
from arcpy import env

env.scratchWorkspace = env.scratchGDB
# set the workspace to the db.gdb where the feature dataset are stored
env.workspace = os.path.join(sys.path[0] + "\\" + "db.gdb")


env.workspace = "db.gdb"
env.overwriteOutput = True

# query number of groups and provide a default value if unspecified
numberGroups = arcpy.GetParameterAsText(0)
if numberGroups == '#' or not numberGroups:
    numberGroups = "2" 
# query countries and provide a default value if unspecified
queryCnty = arcpy.GetParameterAsText(1)
if queryCnty == '#' or not queryCnty:
    queryCnty = "COUNTRY = 'Italy' OR COUNTRY = 'France' OR COUNTRY = 'Germany' OR COUNTRY = 'Spain' OR COUNTRY = 'Belgium'"
#query analysis fields and provide a default value if unspecified
queryFields = arcpy.GetParameterAsText(2)
if queryFields == '#' or not queryFields:
    queryFields = "Permanent_Flow;Work_Flow;Family_Flow"

outputFinal = arcpy.GetParameterAsText(3)
if outputFinal == '#' or not outputFinal:
    outputFinal = "output" # provide a default value if unspecified    


countries_final = "countriesFinal_lyr"    

# Process: Select Layer By Attribute
arcpy.MakeFeatureLayer_management("countries_final","countriesFinal_lyr") 
arcpy.SelectLayerByAttribute_management("countriesFinal_lyr", "NEW_SELECTION", queryCnty)

# Process: Grouping Analysis
arcpy.GroupingAnalysis_stats("countriesFinal_lyr", "ID", outputFinal, numberGroups, queryFields, "NO_SPATIAL_CONSTRAINT", "EUCLIDEAN", "", "", "FIND_SEED_LOCATIONS", "", "", "DO_NOT_EVALUATE")

# Process: Join Field
arcpy.JoinField_management(outputFinal, "ID", countries_final, "ID", "COUNTRY")    
