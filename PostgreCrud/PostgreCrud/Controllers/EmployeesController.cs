using Microsoft.AspNetCore.Mvc;
using PostgreCrud.Models;
using PostgreCrud.Repositories;

namespace PostgreCrud.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeRepository _repo;

    public EmployeesController(EmployeeRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = await _repo.GetAllAsync();
        return Ok(data);
    }
    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(int page=1,int pageSize=5, string? search = null)
    {
        var result = await _repo.GetPagedAsync(page, pageSize,search);

        return Ok(new
        {
            data = result.Data,
            totalCount = result.TotalCount
        });
    }
    [HttpGet("count")]
    public async Task<IActionResult> GetTotalEmployees()
    {
        var total = await _repo.TotalEmployee();
        return Ok(total);
    }
    [HttpPost]
    public async Task<IActionResult> Post(Employee emp)
    {
        await _repo.CreateAsync(emp);
        return Ok();
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id,Employee emp)
    {
        var result=await _repo.UpdateAsync(id, emp);
        if (result == 0)
        {
            return NotFound();
        }
        return Ok();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _repo.DeleteAsync(id);

        if (result == 0)
            return NotFound();

        return Ok();
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
    {
        var result = await _repo.DeleteMultipleAsync(ids);
        return Ok(result);
    }
}