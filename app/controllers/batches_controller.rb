require 'roo'

class BatchesController < ApplicationController
  def new
    @batch = Batch.new
  end

  def create
    batch = Batch.new

    batch.description = params[:batch][:spreadsheet].original_filename
    batch.assembly = params[:batch][:assembly]

    spreadsheet = Roo::CSV.new(params[:batch][:spreadsheet].path)
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

    redirect_to batch
  end
end
