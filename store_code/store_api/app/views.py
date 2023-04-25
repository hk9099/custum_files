import os
import csv
import pandas as pd
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages

# directory path to save export file
export_csv_dir = "/home/smit/HARSH/store_code/store_api/media/export_csv"

# list of files of existing file
files = os.listdir(export_csv_dir)

# file name that will be visible as the download file name
file_name = 'csv_data2.csv'


@csrf_exempt
def csv_upload(request):
    if request.method == 'POST':
        # truncked all old data before upload new data
        StoreCode.objects.all().delete()
        
        try:
            if len(files) == 1:
                os.remove(os.path.join(export_csv_dir, files[0]))
        except:
            pass
        
        # File name that has uploaded from frontend
        csv_file = request.FILES['csv_file']

        dataframe = None
        if str(csv_file).endswith(".xlsx"):
            dataframe = pd.read_excel(csv_file)
        if str(csv_file).endswith(".csv"):
            dataframe = pd.read_csv(csv_file)
        
        data = dataframe.values.tolist()
        
        # create the new data
        for row in data:
            StoreCode.objects.create(
                code = row[0],
                name = row[1],
                old_location = str(row[1]).split("_")[0],
                coming_stock = row[2],
                stock = row[3]
            )
        
        existing_data = StoreCode.objects.all()
        with open(os.path.join(export_csv_dir, file_name), mode='w', newline='') as export_file:
            writer = csv.writer(export_file)
            writer.writerow(['Code', 'Name', 'Old Location', 'New Location', 'Coming Stock', 'Stock'])

            # Write data rows
            for obj in existing_data:
                writer.writerow([obj.code, obj.name, obj.old_location, obj.new_location, obj.coming_stock, obj.stock])
    return redirect('/')


def get_code(request):
    if request.method == 'POST':
        request_code = request.POST['code']
        new_location = request.POST['new_location']
        store_code_objects = StoreCode.objects.filter(code = request_code)
        if store_code_objects:
            StoreCode.objects.filter(code = request_code).update(code = request_code, new_location = new_location)
            messages.success(request, "Record Updated Successfully")
            return redirect('/')
        else:
            StoreCode.objects.create(code = request_code, new_location = new_location)
            messages.success(request, "Record not available new record inserted")
          
        existing_data = StoreCode.objects.all()
        with open(os.path.join(export_csv_dir, file_name), mode='w', newline='') as export_file:
            writer = csv.writer(export_file)
            writer.writerow(['Code', 'Name', 'Old Location', 'New Location', 'Coming Stock', 'Stock'])

            # Write data rows
            for obj in existing_data:
                writer.writerow([obj.code, obj.name, obj.old_location, obj.new_location, obj.coming_stock, obj.stock])  
    return redirect('/')
    
    
def index(request): 
    return render(request, 'index.html')

class ExportCSVFile(APIView):
    def post(self, request):
        to_be_export = "/home/smit/HARSH/store_code/store_api/media/export_csv"
        export_files = os.listdir(to_be_export)
        csv_file_path = None
    
        # CSV file to export
        if len(export_files) == 1:
            csv_file_path = {
                    "csv_path" : f'/media/export_csv/{export_files[0]}'
                    }
        return Response(csv_file_path)
