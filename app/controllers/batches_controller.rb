require 'roo'

class BatchesController < ApplicationController
  def new
    @batch = Batch.new
  end

  def create
    batch = Batch.new

    batch.description = params[:file].original_filename
    batch.assembly = params[:assembly]

    spreadsheet = nil

    case File.extname(params[:file].original_filename)
      when '.csv' then spreadsheet = Roo::CSV.new(params[:file].path)
      when '.xls' then spreadsheet = Roo::Excel.new(params[:file].path, nil, :ignore)
      when '.xlsx' then spreadsheet = Roo::Excelx.new(params[:file].path, nil, :ignore)
      else raise "Unknown file type: #{file.original_filename}"
    end

    spreadsheet_header = spreadsheet.row(1)

    (2..spreadsheet.last_row).each do |i|
      batch_detail = batch.batch_details.new
      # Alternative: row = Hash[*spreadsheet_header.zip(spreadsheet.row(i)).flatten]
      row = Hash[[spreadsheet_header, spreadsheet.row(i)].transpose]

      batch_detail.chrom = row['chrom']
      batch_detail.chrom_start = row['chrom_start'].to_i
      batch_detail.chrom_end = row['chrom_end'].to_i
    end

    batch.save

    respond_to do |format|
      format.json { render json: {:id => batch.id} }
    end
  end

  def show
    @batch = Batch.find(params[:id])
  end
end
