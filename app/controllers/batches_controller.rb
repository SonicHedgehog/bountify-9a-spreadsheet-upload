class BatchesController < ApplicationController
  def new
    @batch = Batch.new
  end

  def create
    batch = Batch.new

    batch.description = params[:batch][:spreadsheet].original_filename
    batch.assembly = params[:batch][:assembly]

    batch.save

    redirect_to batch
  end
end
